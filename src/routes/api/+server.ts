import { json } from '@sveltejs/kit';
import webconfig from "$webconfig/domains.json";

export function GET({}) {
    return json(webconfig)
}