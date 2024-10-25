module.exports = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: '**',
        },
    ],
},
};