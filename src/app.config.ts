export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/new/index',
    'pages/cart/index',
    'pages/my/index'
  ],
  subpackages: [
    {
      root: "pages/category",
      pages: ["index"]
    },
    {
      root: "pages/goodsList",
      pages: ["index"]
    },
    {
      root: "pages/search",
      pages: ["index"]
    },
    {
      root: "pages/goodsDetail",
      pages: ["index"]
    },
    {
      root: "pages/storedGoods",
      pages: ["index"]
    },
    {
      root: "pages/lookedGoods",
      pages: ["index"]
    },
    {
      root: "pages/commitOrder",
      pages: ["index"]
    },
    {
      root: "pages/surplus",
      pages: ["index"]
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
  },
  requiredPrivateInfos: [
    "chooseAddress"
  ]
})
