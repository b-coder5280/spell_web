import { useState } from 'react'
import { useDocumentOperation, type DocumentActionComponent, type DocumentActionProps } from 'sanity'

import { defaultResearchPageParts } from '../../lib/research-page-layout'

const FillResearchPagePartsAction: DocumentActionComponent = (props: DocumentActionProps) => {
    const { patch } = useDocumentOperation(props.id, props.type)
    const [dialogOpen, setDialogOpen] = useState(false)
    const pageParts = Array.isArray(props.draft?.pageParts)
        ? props.draft.pageParts
        : Array.isArray(props.published?.pageParts)
            ? props.published.pageParts
            : []

    if (props.type !== 'researchPage') return null
    if (pageParts.length > 0) return null

    return {
        label: 'Fill research page parts',
        tone: 'primary',
        disabled: Boolean(patch.disabled),
        dialog: dialogOpen
            ? {
                type: 'confirm',
                tone: 'primary',
                message: 'Add movable Research Cards and Overview Image parts?',
                confirmButtonText: 'Add parts',
                cancelButtonText: 'Cancel',
                onConfirm: () => {
                    patch.execute([
                        {
                            set: {
                                pageParts: defaultResearchPageParts,
                            },
                        },
                    ])
                    setDialogOpen(false)
                    props.onComplete()
                },
                onCancel: () => setDialogOpen(false),
            }
            : null,
        onHandle: () => setDialogOpen(true),
    }
}

FillResearchPagePartsAction.displayName = 'FillResearchPagePartsAction'

export const fillResearchPagePartsAction = FillResearchPagePartsAction
