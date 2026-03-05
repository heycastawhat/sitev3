module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("media");
  eleventyConfig.addPassthroughCopy("script");
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("Favicon.png");
  eleventyConfig.addPassthroughCopy("Slitro2.png");
  eleventyConfig.addPassthroughCopy(".gitattributes");

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
    },
    passthroughFileCopy: true,
  };
};
