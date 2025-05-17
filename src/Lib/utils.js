export const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()

    // Same day
    if (date.toDateString() === now.toDateString()) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    // Yesterday
    const yesterday = new Date(now)
    yesterday.setDate(yesterday.getDate() - 1)
    if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday'
    }

    // Within last 7 days
    const oneWeekAgo = new Date(now)
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    if (date > oneWeekAgo) {
        return date.toLocaleDateString([], { weekday: 'short' }) // eg: "Wed"
    }

    // Older messages
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) // eg: "May 10"
}

export const formatDateHeader = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();

    if (date.toDateString() === now.toDateString()) {
        return 'Today';
    }

    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    }

    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    if (date > oneWeekAgo) {
        return date.toLocaleDateString([], { weekday: 'short' }); // eg: "Wed"
    }

    return date.toLocaleDateString([], { month: 'short', day: 'numeric' }); // eg: "May 10"
};