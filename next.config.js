/** @type {import('next').NextConfig} */
const nextConfig = {
    routes: [
        {
            src: `/pages/outstatic/[[...ost]].tsx`,
            dest: `/outstatic`,
        },
        {
            src: `/pages/api/outstatic/[[...ost]].tsx`,
            dest: `/api/outstatic`,
        },
    ],
  };

module.exports = nextConfig
