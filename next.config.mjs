/** @type {import('next').NextConfig} */

const nextConfig = {
  env:{
    server:"https://api.debugchiai.com",
    // server:"http://127.0.0.1:8000",
    ws:"http://127.0.0.1:8001",
    dashboard:'/user/dashboard',
    nodejs_server:"https://www.debugchiai.com",
    MONGODB_URI:"mongodb://localhost:27017/"
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        
      },
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
        
      },
      {
        protocol:"https",
        hostname:"images.unsplash.com"
      },
      {
        protocol:"https",
        hostname:"i.pravatar.cc"
      },
      {
        protocol:"https",
        hostname:"c290918.parspack.net"
      }
    ],
  },
};

export default nextConfig;
