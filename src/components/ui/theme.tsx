export function Theme({ theme }: { theme: { [key: string]: string } }) {
  return (
    <style>
      {`
          :root {
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
          }
         `}
    </style>
  );
}
