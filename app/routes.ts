import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/testi-mobile.tsx"),
  route("chrono", "routes/chrono-mobile.tsx"),
  route("home", "routes/home.tsx"),
  route("login", "routes/login.tsx"),
  route("logout", "routes/logout.tsx"),
] satisfies RouteConfig;
