import { useProjects } from "@/lib/hooks/use-projects";
import { ComboBox, IComboboxOption } from "../common/combo-box";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { AppLogo } from "./app-logo";
import HeaderUtilityButtons from "./header-utility-buttons";
import { ReuseHeader } from "./reuse-header";
import UserMenu from "./user-menu";

const DashboardHeader = () => {
  return (
    <ReuseHeader
      wrapByContainer={false}
      leftSection={<LeftSection />}
      rightSection={<RightSection />}
      className="bg-sidebar"
      containerClassName="border-b"
    />
  );
};

export default DashboardHeader;

const LeftSection = () => {
  const { projects, selectedProjectId, selectProject } = useProjects();

  const projectOptions: IComboboxOption[] = projects.map((project) => ({
    value: project.id,
    label: project.name,
    avatar: project.avatar,
    description: project.description,
  }));

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <AppLogo showName={false} />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <ComboBox
            options={projectOptions}
            value={selectedProjectId}
            onValueChange={selectProject}
            placeholder="Select project..."
            searchPlaceholder="Search projects..."
            emptyText="No projects found."
            allowDeselect={false}
            showAvatar={true}
            buttonVariant="ghost"
          />
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const RightSection = () => {
  return (
    <div className="flex items-center gap-3">
      <HeaderUtilityButtons showThemeSwitcher showGithubButton />
      <UserMenu />
    </div>
  );
};
