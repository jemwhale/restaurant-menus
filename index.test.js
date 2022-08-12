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
            cuisine: 'dry crackers',
            rating: 10
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
    test('can return a positive ratings value no greater than 10 (Restaurant only)', async () => {
        // TODO - write test
        const newR1 = await Restaurant.create({
            name: 'Da Best',
            location: 'somewhere',
            cuisine: 'dry crackers',
            rating: 10
        })
        const getRatingR = await Restaurant.findOne({
            where: {   
                name: 'Da Best'
            }
        });
        expect(getRatingR.rating).toEqual(10);
            try{
            await Restaurant.create({
            name: 'Da Best',
            location: 'somewhere',
            cuisine: 'dry crackers',
            rating: 1000000000
        })
        }catch(err){
            console.log(err.message)
            expect(err.message).toEqual('Validation error: Rating needs to be out of 10!')
        }
        try{
            await Restaurant.create({
            name: 'Da Worst',
            location: 'somewhere',
            cuisine: 'dry crackers',
            rating: -20
        })
        }catch(err){
            console.log(err.message)
            expect(err.message).toEqual('Validation error: Rating needs to be out of 10!')
        }
    });
})