import axios from "axios";

export const appApi=axios.create({
    baseURL:"http://api-ecommerce-app.bluetickcoders.com"
})