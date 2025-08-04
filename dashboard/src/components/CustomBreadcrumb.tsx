import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import React from 'react'
import { useLocation, Link } from 'react-router-dom'

const toTitleCase = (str: string) =>
  str
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())

const CustomBreadcrumb = () => {
  const location = useLocation()
  const segments = location.pathname.split('/').filter(Boolean)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((segment, index) => {
          const path = '/' + segments.slice(0, index + 1).join('/')
          const isLast = index === segments.length - 1
          return (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{toTitleCase(segment)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={path}>{toTitleCase(segment)}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default CustomBreadcrumb
