const {db} = require('./db')
const {Restaurant, Menu} = require('./models/index')
const {
    seedRestaurant,
    seedMenu,
  } = require('./seedData');

describe('Restaurant and Menu Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await db.sync({ force: true });
    });

    test('can create a Restaurant', async () => {
        // TODO - write test
        const newR = await Restaurant.create({
            name: 'hello',
            location: 'somewhere',
            cuisine: 'dry crackers'
        })

        expect(newR.name).toEqual('hello')
    });

    test('can create a Menu', async () => {
        // TODO - write test
        const newM = await Menu.create({
            title: 'Crackers'
        })

        expect(newM.title).toEqual('Crackers')
    });

    test('can find Restaurants', async () => {
        // TODO - write test
        const findR = await Restaurant.findOne({
            where: {
                name: 'hello'
            }
        })
        expect(findR.cuisine).toEqual('dry crackers')
    });

    test('can find Menus', async () => {
        // TODO - write test
        const findM = await Menu.findOne({
            where: {
                title: 'Crackers'
            }
        })
        expect(findM.title).toEqual('Crackers')
    });

    test('can delete Restaurants', async () => {
        // TODO - write test
        const destroyR = await Restaurant.destroy({
            where: {   
                location: 'somewhere'
            }
        });
        const count = await Restaurant.count();
        expect(count).toEqual(0)
    });
})