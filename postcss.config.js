module.exports = {

  plugins: [
    ['tailwindcss', {
      content: [
        './content/**/*.{js,jsx,ts,tsx,md,mdx}',
        './src/**/*.{js,jsx,ts,tsx,md,mdx}',
      ],
    }],
    ['autoprefixer', {}],
    [
      '@fullhuman/postcss-purgecss',
      {
        content: [
          './content/**/*.{js,jsx,ts,tsx,md,mdx}',
          './src/**/*.{js,jsx,ts,tsx,md,mdx}'
        ],
        defaultExtractor: content => content.match(/[A-Za-z0-9-_:\/\!]+/g) || [],
        safelist: ["html", "body", /ant.*/]
      }
    ],
  ]
}
