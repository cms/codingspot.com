module.exports = {
  siteTitle: "CodingSpot.com", // Site title.
  siteTitleShort: "Codingspot", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "Codingspot blog", // Alternative site title for SEO.
  siteLogo: "/logos/logo-1024.png", // Logo used for SEO and manifest.
  siteUrl: "https://codingspot.com", // Domain of your website without pathPrefix.
  pathPrefix: "/", // Prefixes all links. For cases when deployed to example.github.io/gatsby-material-starter/.
  fixedFooter: false, // Whether the footer component is fixed, i.e. always visible
  siteDescription: "Codingspot.com blog", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteFBAppID: "1825356251115265", // FB Application ID for using app insights
  siteGATrackingID: "UA-10630631-1", // Tracking code ID for google analytics.
  disqusShortname: "cms", // Disqus shortname.
  postDefaultCategoryID: "Tech", // Default category for posts.
  dateFromFormat: "YYYY-MM-DD", // Date format used in the frontmatter.
  dateFormat: "DD/MM/YYYY", // Date format for display.
  userName: "Christian C. Salvadó", // Username to display in the author segment.
  userTwitter: "cmsalvado", // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: "Guatemala", // User location to display in the author segment.
  userAvatar: "https://www.gravatar.com/avatar/932fb89b9d4049cec5cba357bf0ae388?size=250", // User avatar to display in the author segment.
  userDescription: `My name is Christian C. Salvadó and I am a Software Developer working and living in Guatemala, Central America.

I currently work on ASP .NET C# based projects, and I personally interested in many programming paradigms, like functional programming, object oriented programming (class and prototype based), logic programming, metaprogramming (reflective and generative programming), with many languages like JavaScript, F#, Haskell, Java, and the list goes on…

I also love Computer Science and related topics like automata theory, computability, computational complexity, mathematical logic, number theory, graph theory, computational geometry, algorithm analysis, data structures, parallel computing, etc, etc, etc…`, // User description to display in the author segment.
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    {
      label: "StackOverflow",
      url: "https://stackoverflow.com/users/5445/cms",
      iconClassName: "fab fa-stack-overflow"
    },
    {
      label: "GitHub",
      url: "https://github.com/cms/",
      iconClassName: "fab fa-github"
    },
    {
      label: "Twitter",
      url: "https://twitter.com/cmsalvado",
      iconClassName: "fab fa-twitter"
    },
    {
      label: "Email",
      url: "mailto:cms@codingspot.com",
      iconClassName: "fa fa-envelope"
    }
  ],
  copyright: "Copyright © 2018." // Copyright string for the footer of the website and RSS feed.
};
