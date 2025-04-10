'use client'

import { useEffect } from 'react'

const Modal = ({ isOpen, onClose, title, children }) => {
    useEffect(() => {
        const handleEscape = e => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                {/* Backdrop */}
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                    onClick={onClose}
                />

                {/* Modal */}
                <div className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
                    {/* Header */}
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">
                            {title}
                        </h2>
                    </div>

                    {/* Content */}
                    <div className="mb-4">{children}</div>
                </div>
            </div>
        </div>
    )
}

export default Modal
