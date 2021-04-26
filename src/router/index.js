import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  // for guests
  {
    path: "/",
    component: () => import("../views/Layout.vue"),
    children: [
      {
        path: "/login",
        name: "login",
        component: () => import("../views/login.vue"),
        meta: {
          requiresGuest: true,
        },
      },
      {
        path: "/signup",
        name: "signup",
        component: () => import("../views/register.vue"),
        meta: {
          requiresGuest: true,
        },
      },

      {
        path: "/verify-otp",
        name: "verify-OTP",
        component: () => import("../views/verify-otp.vue"),
        props: true,
        meta: {
          requiresGuest: true,
        },
      },

      {
        path: "/reset-password",
        name: "reset-password",
        component: () => import("../views/reset-password.vue"),
        props: true,
        meta: {
          requiresGuest: true,
        },
      },

      {
        path: "/reset-password/verify-otp",
        name: "verify-OTP-reset-password",
        component: () => import("../views/verify-otp-reset-password.vue"),
        props: true,
        meta: {
          requiresGuest: true,
        },
      },

      // for only users

      {
        path: "/",
        name: "home",
        component: () => import("../views/home.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/trending",
        name: "trending",
        component: () => import("../views/trending.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/public-feed",
        name: "Public feed",
        component: () => import("../views/public_feed.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/notifications",
        name: "notifications",
        component: () => import("../views/notifications.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/chats",
        component: () => import("../views/Chat/chaters.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/chats/:receiver_id",
        component: () => import("../views/Chat/chats.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/call/video/:receiver_id",
        component: () => import("../views/Chat/VideoCall.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/call/audio/:receiver_id",
        component: () => import("../views/Chat/AudioCall.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/friends",
        name: "friends",
        component: () => import("../views/friends.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/watch-later",
        name: "watch-later",
        component: () => import("../views/watchLater.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/post/:id",
        name: "Post",
        component: () => import("../components/Post/ViewPosts.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/status/:id",
        name: "status",
        component: () => import("../views/status.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/groups",
        name: "groups",
        component: () => import("../views/Group/groups.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/group/:id",
        name: "group",
        component: () => import("../views/Group/group.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
        children: [
          {
            path: "posts",
            component: () => import("../views/Group/posts.vue"),
          },
          {
            path: "about",
            component: () => import("../views/Group/about.vue"),
          },
          {
            path: "community",
            component: () => import("../views/Group/community.vue"),
          },
        ],
      },

      {
        path: "/create/group",
        name: "Create groups",
        component: () => import("../views/Group/CreateGroups.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/edit/group/:id",
        name: "Editgroup",
        props: true,
        component: () => import("../views/Group/EditGroup.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/pages",
        name: "pages",
        component: () => import("../views/Page/pages.vue"),
        meta: {
          requiresAuth: true,
        },
      },

      {
        path: "/page/:id",
        name: "page",
        component: () => import("../views/Page/page.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
        children: [
          {
            path: "posts",
            component: () => import("../views/Page/posts.vue"),
          },
          {
            path: "about",
            component: () => import("../views/Page/about.vue"),
          },
          {
            path: "followers",
            component: () => import("../views/Page/followers.vue"),
          },
        ],
      },

      {
        path: "/create/page",
        name: "Create pages",
        component: () => import("../views/Page/CreatePages.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        name: "EditPage",
        path: "/page/edit/:id",
        component: () => import("../views/Page/EditPage.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },

      {
        path: "/events",
        name: "events",
        component: () => import("../views/event/events.vue"),
        meta: {
          requiresAuth: true,
        },
      },

      {
        name: "event",
        path: "/event/:id",
        component: () => import("../views/event/event.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },

      {
        path: "/create/event",
        name: "Createevents",
        component: () => import("../views/event/CreateEvents.vue"),
        meta: {
          requiresAuth: true,
        },
      },

      {
        name: "EditEvent",
        path: "/event/edit/:id",
        component: () => import("../views/event/EditEvent.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        name: "Search",
        path: "/search/:search/:filter",
        component: () => import("../views/Search.vue"),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/settings",
        name: "setting",
        component: () => import("../views/settings/setting.vue"),
        children: [
          {
            path: "profile",
            component: () => import("../views/settings/profile.vue"),
          },
          {
            path: "language",
            component: () => import("../views/settings/language.vue"),
          },
          {
            path: "privacy",
            component: () => import("../views/settings/privacy.vue"),
          },
          {
            path: "appearance",
            component: () => import("../views/settings/appearance.vue"),
          },
          {
            path: "blocking",
            component: () => import("../views/settings/blocking.vue"),
          },
        ],
      },
      // Unauthorized errors route
      {
        path: "/error/401",
        component: () => import("../views/Errors/401.vue"),
      },
      // online support
      {
        path: "/help",
        component: () => import("../views/OnlineChatSupport.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      // static routes
      /* ------------------------------------------------------------ */
      {
        path: "/FAQ",
        component: () => import("../views/Static/FAQ.vue"),
      },
      {
        path: "/data-privacy",
        component: () => import("../views/Static/data_privacy.vue"),
      },
      {
        path: "/term-and-conditions",
        component: () => import("../views/Static/term_and_conditions.vue"),
      },
      /* --------------------------------------------------------------- */
      {
        name: "profile",
        path: "/:user", // userID or username
        component: () => import("../views/Profile/profile.vue"),
        meta: {
          requiresAuth: true,
        },
        children: [
          {
            path: "posts",
            component: () => import("../views/Profile/posts.vue"),
          },
          {
            path: "friends",
            component: () => import("../views/Profile/friends.vue"),
          },
          {
            path: "followers",
            component: () => import("../views/Profile/followers.vue"),
          },
          {
            path: "about",
            component: () => import("../views/Profile/about.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    component: () => import("../views/Errors/404.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      // Redirect to the Login Page
      next("/login");
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (store.getters.isLoggedIn) {
      // Redirect to the Login Page
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
