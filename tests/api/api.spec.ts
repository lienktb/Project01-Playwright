import test, { expect } from "@playwright/test";

const baseURL = "https://ovcharski.com/shop/wp-json/wp/v2/product";
test.describe("Get products", () => {
    test("GET products without params - should return default product list", async ({ request }) => {
        const response = await request.get(`${baseURL}`);

        expect(response.status()).toBe(200);

        const products = await response.json();
        expect(products.length).toBeGreaterThan(0);

        if(products.length > 0) {
            const firstProduct = products[0];
            expect(firstProduct).toHaveProperty('id');
            expect(firstProduct).toHaveProperty('link');
            expect(firstProduct).toHaveProperty('slug');
            expect(firstProduct).toHaveProperty('status');
            expect(firstProduct).toHaveProperty('type');
            expect(firstProduct).toHaveProperty('class_list');
        }
    })

    test("GET products - verify page 2 with 5 items per page", async ({ request }) => {
        const page = 2;
        const limit = 5;

        const response = await request.get(`${baseURL}`, {
            params: {
                page,
                limit
            }
        });
        expect(response.status()).toBe(200);

        const products = await response.json();
        expect(products.length).toBe(limit);

        const headers = response.headers();
        const totalItems = headers['x-wp-total'];
        const totalPages = headers['x-wp-totalpages'];


    })
})

const products = [
    { name: "Jenkins Fire", id: 113 },
    { name: "Jenkins General", id: 111 },
    { name: "Jenkins Superhero", id: 102 }
]
test.describe("CRUD product", () => {
    products.forEach(product => {
        test(`GET product by ${product.id}`, async ({ request }) => {
            const response = await request.get(`${baseURL}/${product.id}`);

            expect(response.status()).toBe(200);
            
            const productItem = await response.json();

            // expect(productItem).toBeGreaterThan(0);
            expect(productItem.id).toBe(product.id);
            expect(productItem.title.rendered).toBe(product.name);
            expect(productItem).toHaveProperty('id');
            expect(productItem).toHaveProperty('link');
            expect(productItem).toHaveProperty('slug');
            expect(productItem).toHaveProperty('status');
            expect(productItem).toHaveProperty('type');
            expect(productItem).toHaveProperty('class_list');
        })
    })

    test(`GET product not found`, async ({ request }) => {
        const response = await request.get(`${baseURL}/90`);

        expect(response.status()).toBe(404);
        const responseJson = await response.json();
        expect(responseJson.message).toBe("Invalid post ID.");
    })
})