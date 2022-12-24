export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/new/index',
    'pages/cart/index',
    'pages/my/index'
  ],
  subpackages: [
    {
      root: "pages/subpkg",
      pages: [
        "category/index",
        "goodsList/index",
        "search/index",
        "goodsDetail/index"
      ]
    }
  ],
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#6495ED',
    navigationBarTextStyle: 'white'
  },
  tabBar: {
    selectedColor: '#6495ED',
    list: [
      {
        text: '首页',
        pagePath: 'pages/home/index',
        iconPath: 'public/tabbar/home.png',
        selectedIconPath: 'public/tabbar/home-active.png'
      },
      {
        text: '新品',
        pagePath: 'pages/new/index',
        iconPath: 'public/tabbar/new.png',
        selectedIconPath: 'public/tabbar/new-active.png'
      },
      {
        text: '购物车',
        pagePath: 'pages/cart/index',
        iconPath: 'public/tabbar/cart.png',
        selectedIconPath: 'public/tabbar/cart-active.png'
      },
      {
        text: '我的',
        pagePath: 'pages/my/index',
        iconPath: 'public/tabbar/my.png',
        selectedIconPath: 'public/tabbar/my-active.png'
      }
    ]
  }
})
