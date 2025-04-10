'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import { formatDistanceToNow } from 'date-fns'
import { CaretDown, CaretUp } from '@phosphor-icons/react'
import Button from '@/components/Button'
import Modal from '@/components/Modal'

const CommentModal = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    initialContent = '',
}) => {
    const [content, setContent] = useState(initialContent)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async e => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            await onSubmit(content)
            setContent('')
            onClose()
        } catch (error) {
            console.error('Error submitting comment:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    className="w-full h-32 p-2 border rounded-md"
                    placeholder="Write your comment..."
                    required
                />
                <div className="flex justify-end gap-2">
                    <Button onClick={onClose} variant="secondary">
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                </div>
            </form>
        </Modal>
    )
}

const Comment = ({ comment, onReply }) => {
    const [showReplies, setShowReplies] = useState(false)
    const [replies, setReplies] = useState([])
    const [isLoadingReplies, setIsLoadingReplies] = useState(false)
    const [showReplyModal, setShowReplyModal] = useState(false)

    const loadReplies = async () => {
        if (!showReplies) {
            setIsLoadingReplies(true)
            try {
                const response = await axios.get(
                    `/api/comments/${comment.id}/replies`,
                )
                setReplies(response.data.data)
            } catch (error) {
                console.error('Error loading replies:', error)
            } finally {
                setIsLoadingReplies(false)
            }
        }
        setShowReplies(!showReplies)
    }

    return (
        <div className="border-b py-4">
            <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold">{comment.users.name}</span>
                <span className="text-gray-500 text-sm">
                    {formatDistanceToNow(new Date(comment.created_at), {
                        addSuffix: true,
                    })}
                </span>
            </div>
            <p className="mb-2">{comment.content}</p>
            <div className="flex items-center gap-4">
                <Button
                    variant="link"
                    onClick={() => setShowReplyModal(true)}
                    className="text-sm">
                    Reply
                </Button>
                {comment.replies_count > 0 && (
                    <button
                        onClick={loadReplies}
                        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                        {comment.replies_count} replies
                        {showReplies ? (
                            <CaretUp size={16} />
                        ) : (
                            <CaretDown size={16} />
                        )}
                    </button>
                )}
            </div>

            {showReplies && (
                <div className="ml-8 mt-4">
                    {isLoadingReplies ? (
                        <div className="text-gray-500">Loading replies...</div>
                    ) : (
                        replies.map(reply => (
                            <div
                                key={reply.id}
                                className="border-l-2 pl-4 py-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold">
                                        {reply.users.name}
                                    </span>
                                    <span className="text-gray-500 text-sm">
                                        {formatDistanceToNow(
                                            new Date(reply.created_at),
                                            {
                                                addSuffix: true,
                                            },
                                        )}
                                    </span>
                                </div>
                                <p>{reply.content}</p>
                            </div>
                        ))
                    )}
                </div>
            )}

            <CommentModal
                isOpen={showReplyModal}
                onClose={() => setShowReplyModal(false)}
                onSubmit={async content => {
                    await onReply(comment.id, content)
                }}
                title="Reply to comment"
            />
        </div>
    )
}

const RecipeComments = ({ recipeId, recipeSlug }) => {
    const { user } = useAuth()
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [showAddCommentModal, setShowAddCommentModal] = useState(false)
    const [pagination, setPagination] = useState(null)

    const loadComments = async (
        url = `/api/comments/recipe-slug/${recipeSlug}`,
    ) => {
        try {
            const response = await axios.get(url)
            setComments(prev =>
                pagination
                    ? [...prev, ...response.data.data]
                    : response.data.data,
            )
            setPagination(response.data)
        } catch (error) {
            console.error('Error loading comments:', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadComments()
    }, [recipeSlug])

    const handleAddComment = async content => {
        try {
            await axios.post('/api/comments', {
                recipe_id: recipeId,
                content,
            })
            // Reload comments
            setComments([])
            loadComments()
        } catch (error) {
            console.error('Error adding comment:', error)
            throw error
        }
    }

    const handleReply = async (parentId, content) => {
        try {
            await axios.post('/api/comments', {
                recipe_id: recipeId,
                parent_id: parentId,
                content,
            })
            // Reload comments to update reply count
            setComments([])
            loadComments()
        } catch (error) {
            console.error('Error adding reply:', error)
            throw error
        }
    }

    return (
        <div className="mt-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Comments</h2>
                {user && (
                    <Button onClick={() => setShowAddCommentModal(true)}>
                        Add Comment
                    </Button>
                )}
            </div>

            {isLoading ? (
                <div className="text-gray-500">Loading comments...</div>
            ) : comments.length === 0 ? (
                <div className="text-gray-500">No comments yet</div>
            ) : (
                <>
                    {comments.map(comment => (
                        <Comment
                            key={comment.id}
                            comment={comment}
                            onReply={handleReply}
                        />
                    ))}
                    {pagination?.next_page_url && (
                        <div className="mt-4 text-center">
                            <Button
                                onClick={() =>
                                    loadComments(pagination.next_page_url)
                                }
                                variant="secondary">
                                Load More
                            </Button>
                        </div>
                    )}
                </>
            )}

            <CommentModal
                isOpen={showAddCommentModal}
                onClose={() => setShowAddCommentModal(false)}
                onSubmit={handleAddComment}
                title="Add Comment"
            />
        </div>
    )
}

export default RecipeComments
