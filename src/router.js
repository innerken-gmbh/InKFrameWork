import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        {
          name: 'Position Management',
          path: 'Position/position-manage',
          component: () => import('@/views/Position/PositionManagement'),

        },
        {
          name: 'Restaurant',
          path: 'Restaurant/restaurant-manage',
          component: () => import('@/views/Restaurant/RestaurantManagement'),
        },
        {
          name: 'Groups',
          path: 'Group/group-manage',
          component: () => import('@/views/Group/GroupManage'),
        },
        {
          name: 'Staffs in Group',
          path: 'Group/GroupStaffDetail/:id',
          props: true,
          component: () => import('@/views/Group/GroupStaffDetail'),
        },
        {
          name: 'Staff Management',
          path: 'Staff/staffmanage',
          component: () => import('@/views/Staff/StaffManagement'),
        },
        {
          name: 'Q&A',
          path: 'Setting/q-and-a',
          component: () => import('@/views/Setting/QandA'),
        },
        {
          name: 'About US',
          path: 'Setting/about-us',
          component: () => import('@/views/Setting/AboutUS'),
        },
        {
          name: 'Staff Infomation',
          path: 'Details/StaffDetail/:id',
          props: true,
          component: () => import('@/views/Details/StaffDetail'),
        },
        {
          name: 'Staff Work Record',
          path: 'Details/WorkCheck/:id',
          props: true,
          component: () => import('@/views/Details/WorkCheckByTime'),
        },
        {
          name: 'Staff Check-in Record',
          path: 'Details/StaffCheck/:id',
          props: true,
          component: () => import('@/views/Details/StaffCheckInRecord'),
        },
        {
          name: '用户管理',
          path: 'User/user-management',
          props: true,
          component: () => import('@/views/User/UserManagement'),
        },
        // Pages

        {
          name: 'User Profile',
          path: 'pages/user',
          component: () => import('@/views/dashboard/pages/UserProfile'),
        },
        {
          name: 'Timeline',
          path: 'pages/timeline',
          component: () => import('@/views/dashboard/pages/Timeline'),
        },
        // Components
        {
          name: 'Buttons',
          path: 'components/buttons',
          component: () => import('@/views/dashboard/component/Buttons'),
        },
        {
          name: 'Grid System',
          path: 'components/grid-system',
          component: () => import('@/views/dashboard/component/Grid'),
        },
        {
          name: 'Tabs',
          path: 'components/tabs',
          component: () => import('@/views/dashboard/component/Tabs'),
        },
        {
          name: 'Notifications',
          path: 'components/notifications',
          component: () => import('@/views/dashboard/component/Notifications'),
        },
        {
          name: 'Icons',
          path: 'components/icons',
          component: () => import('@/views/dashboard/component/Icons'),
        },
        {
          name: 'Typography',
          path: 'components/typography',
          component: () => import('@/views/dashboard/component/Typography'),
        },
        // Forms
        {
          name: 'Regular Forms',
          path: 'forms/regular',
          component: () => import('@/views/dashboard/forms/RegularForms'),
        },
        {
          name: 'Extended Forms',
          path: 'forms/extended',
          component: () => import('@/views/dashboard/forms/ExtendedForms'),
        },
        {
          name: 'Validation Forms',
          path: 'forms/validation',
          component: () => import('@/views/dashboard/forms/ValidationForms'),
        },
        {
          name: 'Wizard',
          path: 'forms/wizard',
          component: () => import('@/views/dashboard/forms/Wizard'),
        },
        // Restaurant
        {
          name: 'Regular Restaurant',
          path: 'tables/regular-tables',
          component: () => import('@/views/dashboard/tables/RegularTables'),
        },
        {
          name: 'Extended Restaurant',
          path: 'tables/extended-tables',
          component: () => import('@/views/dashboard/tables/ExtendedTables'),
        },
        {
          name: 'Data Tabels',
          path: 'tables/data-tables',
          component: () => import('@/views/dashboard/tables/DataTables'),
        },
        // Maps
        {
          name: 'Google Maps',
          path: 'maps/google-maps',
          component: () => import('@/views/dashboard/maps/GoogleMaps'),
        },
        {
          name: 'Full Screen Map',
          path: 'maps/full-screen-map',
          component: () => import('@/views/dashboard/maps/FullScreenMap'),
        },
        // Root level
        {
          name: 'Widgets',
          path: 'widgets',
          component: () => import('@/views/dashboard/Widgets'),
        },
        {
          name: 'Charts',
          path: 'charts',
          component: () => import('@/views/dashboard/Charts'),
        },
        {
          name: 'Calendar',
          path: 'calendar',
          component: () => import('@/views/dashboard/Calendar'),
        },
      ],
    },
    {
      path: '*',
      component: () => import('@/views/pages/Index'),
      children: [
        {
          name: 'Log In',
          path: '/pages/login',
          component: () => import('@/views/pages/Login'),
        },
        {
          name: 'Register',
          path: '/pages/register',
          component: () => import('@/views/pages/Register'),
        },
        {
          name: 'Pricing',
          path: '/pages/pricing',
          component: () => import('@/views/pages/Pricing'),
        },
        {
          name: 'Log In',
          path: '/pages/logIn',
          component: () => import('@/views/pages/Login'),
        },
        {
          name: '404 Error',
          path: '',
          component: () => import('@/views/pages/Error'),
        },
      ],
    },
  ],
})
