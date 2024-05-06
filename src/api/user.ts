import httpIns from "@/api/http"
import qs from "qs"

export const loginAPI = ({
    username,
    password,
}: {
    username: string
    password: string
}) => {
    return httpIns({
        url: "/login",
        method: "post",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
            username,
            password,
        }),
    })
}