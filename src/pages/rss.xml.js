import rss from "@astrojs/rss";
import { getPublishedPosts } from "../lib/blog";

export async function GET(context) {
  const posts = await getPublishedPosts();

  return rss({
    title: "Germán Riveros — Blog",
    description:
      "Guías breves sobre mantenimiento, seguridad, rendimiento y accesibilidad para sitios web existentes.",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
    })),
    customData: "<language>es-cl</language>",
  });
}