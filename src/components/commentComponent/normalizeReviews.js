const normalizeReviews = (reviewsData) => {
    return reviewsData.map(review => {
        const date = new Date(review.createdAt);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        const formattedDate = `${day}/${month}/${year}`;
        const formattedTime = `${hours}:${minutes}:${seconds}`;

        return {
            id: review._id,
            userId: review.userId._id,
            avatar: review.userId.image,
            author: `${review.userId.firstName} ${review.userId.lastName}`,
            images: review.images,
            time: `${formattedDate} ${formattedTime}`,
            text: review.comment,
            rating: review.rate
        };
    });
};

export default normalizeReviews;
