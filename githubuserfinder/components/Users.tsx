type User = {
    id: number,
    name:string,
}
export default async function Users() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users",);
    const User:User[] = await response.json();
    
    return (
        <>
            {User.map((user: User) => (
                 <div key={user.id}>{user.name}</div>
            ))}
        </>
    )
}