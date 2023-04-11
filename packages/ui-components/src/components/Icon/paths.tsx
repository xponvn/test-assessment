interface IPath {
  [key: string]: { type: 'stroke' | 'fill'; path: React.ReactNode };
}

export const paths: IPath = {
  arrowDown: {
    type: 'stroke',
    path: (
      <path
        d="M6 9.5L12 15.5L18 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
};
