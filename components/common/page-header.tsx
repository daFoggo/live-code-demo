import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Typography } from "./typography";

interface IPageHeader {
  breadcrumbs?: {
    href: string;
    label: string;
  }[];
  title: string;
}
const PageHeader = ({ breadcrumbs, title }: IPageHeader) => {
  return (
    <div className="flex flex-col justify-between items-start gap-3 max-w-4xl">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs?.map((breadcrumb, index) => (
            <>
              <BreadcrumbItem key={index}>
                <BreadcrumbLink href={breadcrumb.href}>
                  {breadcrumb.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator key={`separator-index`} />
            </>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <Typography variant="h2">{title}</Typography>
    </div>
  );
};

export default PageHeader;
