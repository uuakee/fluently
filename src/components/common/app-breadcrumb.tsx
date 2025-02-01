import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

interface AppBreadcrumbProps {
  uiLink?: string
  uiName: string
  uiLinkHref?: string
}

export function AppBreadcrumb({ uiLink, uiName, uiLinkHref = "#" }: AppBreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {uiLink && (
          <>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href={uiLinkHref}>{uiLink}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
          </>
        )}
        <BreadcrumbItem>
          <BreadcrumbPage>{uiName}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
