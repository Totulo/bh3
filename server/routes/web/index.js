module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const mongoose = require('mongoose')
  const Category = mongoose.model('Category')
  const Article = mongoose.model('Article')
  const Armor = mongoose.model('Armor')
  const WallPaper = mongoose.model('Wallpaper')

  //获取新闻列表
  router.get('/news/list', async (req, res) => {
    const parent = await Category.findOne({
      name: '新闻资讯'
    })
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      { $lookup: {
        from: 'articles',
        localField: '_id',
        foreignField: 'categories',
        as: 'newsList'
      }},
      
      { $addFields: {
        newsList: { $slice: ['$newsList', 5] }
      }}
    ])
    const subCats = cats.map(c => c._id)
    cats.unshift({
      name: '最新',
      newsList: await Article.find().where({
        categories: { $in: subCats }
      }).populate('categories').limit(5).lean()
    })

    cats.map(cat => {
      cat.newsList.map(news => {
        news.categoryName = cat.name === '最新' ? news.categories[0].name : cat.name
        return news
      })
    })

    res.send(cats)
  });

  //文章详情
  router.get('/articles/:id', async (req, res) => {
    const data = await Article.findById(req.params.id).populate('categories')
    
    res.send(data)
  });

  //获取角色列表
  router.get('/valkyries/list', async (req, res) => {
    const parent = await Category.findOne({
      name: '女武神'
    })
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      { $lookup: {
        from: 'armors',
        localField: '_id',
        foreignField: 'parent',
        as: 'armorsList'
      }},
    ])
    res.send(cats)
  });

  //角色详情
  router.get('/armor/:id', async (req, res) => {
    const data = await Armor.findById(req.params.id).populate('parent')
    res.send(data)
  })

  //壁纸详情
  router.get('/wallpaper/list', async(req, res) => {
    const data = await WallPaper.find()
    res.send(data)
  })

  

  app.use('/web/api', router)
}