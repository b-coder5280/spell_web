import { useState } from 'react'
import { useDocumentOperation, type DocumentActionComponent, type DocumentActionProps } from 'sanity'

import { defaultHomeBuilderSections } from '../../lib/home-builder-defaults'

export const fillHomeBuilderDefaultsAction: DocumentActionComponent = (props: DocumentActionProps) => {
    const { patch } = useDocumentOperation(props.id, props.type)
    const [dialogOpen, setDialogOpen] = useState(false)
    const sections = Array.isArray(props.draft?.sections)
        ? props.draft.sections
        : Array.isArray(props.published?.sections)
            ? props.published.sections
            : []

    if (props.type !== 'homePage') return null
    if (sections.length > 0) return null

    return {
        label: 'Fill home builder defaults',
        tone: 'primary',
        disabled: Boolean(patch.disabled),
        dialog: dialogOpen
            ? {
                type: 'confirm',
                tone: 'primary',
                message: 'Add the default homepage sections? This will not enable the Page Builder on the public website.',
                confirmButtonText: 'Add sections',
                cancelButtonText: 'Cancel',
                onConfirm: () => {
                    patch.execute([
                        {
                            set: {
                                pageTitle: 'SPELL Home Page',
                                pageBuilderEnabled: false,
                                sections: defaultHomeBuilderSections,
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

fillHomeBuilderDefaultsAction.displayName = 'FillHomeBuilderDefaultsAction'
