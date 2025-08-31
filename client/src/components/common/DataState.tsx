import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertTriangle, PackageOpen } from "lucide-react"
import React from "react"

type Props = {
  variant: "error" | "empty"
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

export default function DataState({ variant, title, description, actionLabel, onAction }: Props) {
  const Icon = variant === "error" ? AlertTriangle : PackageOpen
  const color = variant === "error" ? "text-red-500" : "text-muted-foreground"

  return (
    <Card className="w-full flex flex-col items-center justify-center gap-3 py-10 text-center">
      <Icon className={`${color}`} size={36} />
      <h3 className="text-lg font-semibold text-primary">{title}</h3>
      {description ? (
        <p className="text-sm text-muted-foreground max-w-md">{description}</p>
      ) : null}
      {actionLabel && onAction ? (
        <Button onClick={onAction} variant="outline" className="mt-2">
          {actionLabel}
        </Button>
      ) : null}
    </Card>
  )
}

