const cmsUrl = process.env.CMS_URL;

export async function getTheme(tenant = "") {
  const response = await fetch(`${cmsUrl}/theme/${tenant}.json`);
  return await response.json();
}
