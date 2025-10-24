import "./Loader.css";

type LoaderProps = {
  label?: string;
  className?: string;
  inline?: boolean;
  sizePx?: number; // override height in px
};

export const Loader: React.FC<LoaderProps> = ({ label, className, inline, sizePx }) => {
  if (inline) {
    return (
      <span className={"inline-flex items-center text-current " + (className || "") }>
        <span className="inline-loader" style={sizePx ? { height: sizePx } : undefined} />
      </span>
    );
  }

  return (
    <div className={"flex flex-col items-center justify-center py-6 text-muted-foreground " + (className || "") }>
      <div className="loader" style={sizePx ? { height: sizePx } : undefined} />
      {label ? (
        <p className="mt-2 text-xs md:text-sm text-center">{label}</p>
      ) : null}
    </div>
  );
};
