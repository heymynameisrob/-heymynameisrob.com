const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const excerpt = require('eleventy-plugin-excerpt');

module.exports = function (eleventyConfig) {  
  eleventyConfig.addPassthroughCopy("src/admin/");  
  eleventyConfig.addPassthroughCopy({"src/_includes/assets" : "./static"});
  
  // Plugins
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  });
  
  eleventyConfig.setLibrary("md", markdownLibrary);  
  eleventyConfig.addPlugin(excerpt);

  // Filter
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat("dd LLL yyyy");
  });

  eleventyConfig.addCollection("feed", collection => {
    return collection
      .getFilteredByTag("posts")
      .reverse()
      .slice(0, 4);
  });

  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about those.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.io/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`
    // pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",

    // These are all optional, defaults are shown:
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }    
  };
};
