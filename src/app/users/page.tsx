import { getUsers } from "@/utils/actions"

export default async function Users()
{

    const users: User[] = await getUsers()

    return(
        <div>
            {
                users.map(item => (
                    <div key={item.id} className="flex flex-col">
                        <div>
                            {
                                item.username
                            }
                        </div>
                        <div>
                            {
                                item.email
                            }
                        </div>
                        
                    </div>
                ))
            }
        </div>
    )
}