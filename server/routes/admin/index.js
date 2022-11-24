const Valkyrie = require('../../models/Valkyrie')

module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')
  
  //登录授权中间件
  const authMiddleware = require('../../middleware/auth')
  router.get('/', authMiddleware() ,async (req, res) => {
    let options = {}
    if (req.model.modelName === 'Category' ) {
      options.populate = 'parent'
    }
    const items = await req.model.find().setOptions(options).limit(100)
    res.send(items)
  })

  router.post('/', authMiddleware() , async (req, res) => {
    const model =  await req.model.create(req.body)
    res.send(model)
  })
  router.get('/:id', authMiddleware() , async (req, res) => {
    const items =  await req.model.findById(req.params.id)
    res.send(items)
  })
  router.put('/:id', authMiddleware() , async (req, res) => {
    const items =  await req.model.findByIdAndUpdate(req.params.id, req.body)
    res.send(items)
  })
  router.delete('/:id', authMiddleware() , async (req, res) => {
    const items = await req.model.findByIdAndDelete(req.params.id, req.body)
    res.send({ success: true })
  })
  app.use('/admin/api/rest/:resource', authMiddleware() , async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.model = require(`../../models/${modelName}`)
    next()
  } ,router)

  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
  //文件上传
  app.post('/admin/api/upload', authMiddleware() , upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    //查找用户
    const AdminUser = require('../../models/AdminUser')
    const user = await AdminUser.findOne({username}).select('+password')
    assert(user, 422, '用户不存在')
    //校验密码
    const isValid = require('bcrypt').compareSync(password,user.password)
    if (!isValid) {
      return res.status(422).send({
        message: '密码错误'
      })
    }
    //返回token
    
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send({token})
  })

  // 错误处理函数
  app.use(async(err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}
