// import sanityClient from "@sanity/client";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "z35fje13",
  dataset: "production",
  apiVersion: "2023-12-10",
  useCdn: true,
  token:
    "skRHL2PfKED4QPCjmVVOfxyuPYU9PCIs6SLyDKjmRpH4y0PcGuLfSKriSCTvGqbROtgVoPvJHy3ir9WmyTW9HbnpQ3uf8GqEujU2JolJlf8eOzRb5Nm3WYQ6ViIEdzQxCt8Xm44GwQxM2esP5CGPfweeRjEdTQ7UKAVMURb29Fyqplbdf7Ak",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
