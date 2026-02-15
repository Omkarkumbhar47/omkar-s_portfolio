## <h1 align="center"> Personal Portfolio (Learning Reference Project)</h1>

This project is an earlier portfolio implementation built while exploring modern web technologies and interactive 3D UI patterns.

It was created as a learning exercise using an open-source portfolio design and helped me understand advanced animation, layout systems, and 3D background effects.


[![Site preview](/public/site-preview.png)](https://v2-portfolio-navy.vercel.app/)

My design portfolio to showcase a few projects. Built with [Remix](https://remix.run/), [Three.js](https://threejs.org/), and [Framer Motion](https://www.framer.com/motion/). View the [live site](https://v2-portfolio-navy.vercel.app/).


## Current Portfolio

👉 https://v2-portfolio-navy.vercel.app/

## Install & run

Make sure you have nodejs `19.9.0` or higher and npm `9.6.3` or higher installed. Install dependencies with:

```bash
npm install
```

Once it's done start up a local server with:

```bash
npm run dev
```

## Deployment

I've set up the site using Cloudflare for hosting. Deploy the site to Cloudflare Pages:

```bash
npm run deploy
```

## Permissions

I'm cool with anyone using the code or parts of the code for their own site, it is open source so people can learn from it and adapt it. However, I would encourage you to modify the theme and components it to make it your own. If you are using the site's design largely unmodified, I'd appreciate being credited as the designer of the website.

## Credits

This project was inspired by an open-source portfolio design and used as a learning reference.
All original design credits belong to the original creator.

I used this to understand structure, animation, and layout techniques before building my own custom portfolio.

## FAQs

<details>
  <summary>How do I change the color on the <code>DisplacementSphere</code> (blobby rotating thing in the background).</summary>
  
  You'll need to edit the fragment shader. [Check out this issue for more details](https://github.com/HamishMW/portfolio/issues/19#issuecomment-870996615).
</details>

<details>
  <summary>How do I get the contact form to work?</summary>
  
  To get the contact form working create an AWS account and set up SES (Simple Email service). Then plug in your details into `.dev.vars.example` and rename it to `.dev.vars`. You'll also need to add these as enviroment variables in the Cloudflare dashboard for it to work in production. Or if you don't mind sending through gmail use [nodemailer](https://nodemailer.com/) instead.
</details>
