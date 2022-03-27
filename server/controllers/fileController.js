const fileService = require("../services/fileService")
const User = require("../models/User")
const File = require("../models/File")
const fs = require('fs')
const config = require("config")
const uuid = require("uuid")
class FileController{
    async createDir(req,res){
        try{
            const {name, type , parent} = req.body
            const file = new File({name, type, parent, user : req.user.id})
            const parentFile = await File.findOne({_id : parent})
            if(!parentFile){
                file.path = name;
                await fileService.createDir(file)
            } else {
                file.path = `${parentFile.path}\\${file.name}`
                await fileService.createDir(file)
                parentFile.childs.push(file._id)
                await parentFile.save()
            }
            await file.save()
            return res.json(file)
        } catch (e) {
            console.log(e)
            return res.status(400).json({message : "Не удалось создать папку"})
        }
    }
    async getFiles(req,res){
        try {
            const {sort} = req.query
            let files
            switch (sort) {
                case 'name':
                    files = await File.find({user: req.user.id, parent: req.query.parent}).sort({name:1})
                    break
                case 'type':
                    files = await File.find({user: req.user.id, parent: req.query.parent}).sort({type:1})
                    break
                case 'date':
                    files = await File.find({user: req.user.id, parent: req.query.parent}).sort({date:1})
                    break
                default:
                    files = await File.find({user: req.user.id, parent: req.query.parent})
                    break;
            }
            return res.json(files)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message : "Не удалось получить файлы, попробуйте перезапустить страницу"})
        }
    }
    async uploadFile(req,res){
        try{
            const file = req.files.file
            const parent = await File.findOne({user : req.user.id, _id : req.body.parent})
            const user = await User.findOne({_id: req.user.id})
            if(user.usedSpace + file.size > user.diskSpace) return res.status(400).json({message : 'Нет места на диске'})
            user.usedSpace = user.usedSpace + file.size
            let path;
            if(parent){
                path = `${config.get('filePath')}\\${user._id}\\${parent.path}\\${file.name}`
            } else{
                path = `${config.get('filePath')}\\${user._id}\\${file.name}`
            }
            if(fs.existsSync(path)){
                return res.status(400).json({message : 'Файл уже существует'})
            }
            file.mv(path)
            const type = file.name.split('.').pop()
            let filePath = file.name;
            if(parent){
                filePath = parent.path + "\\" + file.name
            }
            const dbFile = new File({
                name : file.name,
                type,
                size : file.size,
                path : filePath,
                parent : parent?._id,
                user : user._id
            })
            await dbFile.save()
            await user.save()
            res.json(dbFile)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message : "Не удалось загрузить файл"})
        }
    }
    async downloadFile(req,res){
        try {
            const file = await File.findOne({_id : req.query.id, user : req.user.id})
            const path = fileService.getPath(file)
            if(fs.existsSync(path)){
                return res.download(path, file.name)
            } 
            return res.status(400).json({message : "Файл не найден"})
        } catch (e) {
            res.status(400).json({message : "Ошибка скачивания файла"})
            console.log(e);
        }
    }
    async deleteFile(req,res){
        try {
            const user = await User.findOne({_id: req.user.id})
            const file = await File.findOne({_id: req.query.id, user: req.user.id})
            if (!file) {
                return res.status(400).json({message: 'Файл не найден'})
            }
            user.usedSpace = user.usedSpace - file.size
            fileService.deleteFile(file)
            await file.remove()
            await user.save()
            return res.json({message: 'Файл успешно был удален'})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Папка не пуста, требуется удалить все внутренние файлы'})
        }
    }
    async uploadAvatar(req,res){
        try {
            const file = req.files.file
            const user = await User.findById(req.user.id)
            const avatarName = uuid.v4() + ".jpg"
            file.mv(config.get('staticPath') + "\\" + avatarName)
            user.avatar = avatarName
            await user.save()
            return res.json(user)
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Ошибка загрузки аватара'})
        }
    }
    async deleteAvatar(req,res){
        try {
            const user = await User.findById(req.user.id)
            fs.unlinkSync(config.get("staticPath") + "\\" + user.avatar)
            user.avatar = null;
            await user.save()
            return res.json(user)
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Не удалось удалить аватар'})
        }
    }
}

module.exports = new FileController()