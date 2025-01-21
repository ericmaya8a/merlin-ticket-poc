export function Theme({ theme }: { theme: { [key: string]: string } }) {
  return (
    // TODO: Agree on a naming convention for the api values
    <style>
      {`
          :root {
            /* Custom brand Colors */
            --core-primary-1: ${theme["--core-primary-1"]};
            --core-primary-2: ${theme["--core-primary-2"]};
            --core-secondary-1: ${theme["--core-secondary-1"]};
            --core-secondary-2: ${theme["--core-secondary-2"]};
            --core-secondary-dark-1: ${theme["--core-secondary-dark-1"]};
            --core-secondary-dark-2: ${theme["--core-secondary-dark-2"]};
            --core-secondary-3: ${theme["--core-secondary-3"]};
            --core-secondary-4: ${theme["--core-secondary-4"]};
            --core-secondary-dark-3: ${theme["--core-secondary-dark-3"]};
            --core-secondary-dark-4: ${theme["--core-secondary-dark-4"]};
            /* Shadcn Colors */
            --background: ${theme["--background"]};
            --foreground: ${theme["--foreground"]};
            --card: ${theme["--card"]};
            --card-foreground: ${theme["--card-foreground"]};
            --popover: ${theme["--popover"]};
            --popover-foreground: ${theme["--popover-foreground"]};
            --primary: ${theme["--primary"]};
            --primary-foreground: ${theme["--primary-foreground"]};
            --secondary: ${theme["--secondary"]};
            --secondary-foreground: ${theme["--secondary-foreground"]};
            --muted: ${theme["--muted"]};
            --muted-foreground: ${theme["--muted-foreground"]};
            --accent: ${theme["--accent"]};
            --accent-foreground: ${theme["--accent-foreground"]};
            --destructive: ${theme["--destructive"]};
            --destructive-foreground: ${theme["--destructive-foreground"]};
            --border: ${theme["--border"]};
            --input: ${theme["--input"]};
            --ring: ${theme["--ring"]};
            --chart-1: ${theme["--chart-1"]};
            --chart-2: ${theme["--chart-2"]};
            --chart-3: ${theme["--chart-3"]};
            --chart-4: ${theme["--chart-4"]};
            --chart-5: ${theme["--chart-5"]};
            --radius: ${theme["--radius"]};
          }
         `}
    </style>
  );
}
