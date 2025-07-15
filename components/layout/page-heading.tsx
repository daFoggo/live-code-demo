export interface IPageHeadingProps {
  title?: string;
  description?: string;
}
const PageHeading = ({ title, description }: IPageHeadingProps) => {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex flex-col">
        <p className="text-h1">{title}</p>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center gap-3"></div>
    </div>
  );
};

export default PageHeading;
