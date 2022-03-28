function UserProfilePage() {
    return (
        <div>Tennyson</div>
    )    
}

export async function getServerSideProps(context) {
    const { params, req, res } = context;

    return {
        props: {
            username: 'Tenny'
        }
    };
}

export default UserProfilePage;
