const {db} = require('./db')
const {Restaurant, Menu, Item} = require('./models/index')
const {
    seedRestaurant,
    seedMenu,
  } = require('./seedData');

    Restaurant.belongsToMany(Menu, {through: 'variety'});
    Menu.belongsToMany(Restaurant, {through: 'variety'});

    Menu.belongsToMany(Item, {through: 'food'});
    Item.belongsToMany(Menu, {through: 'food'});

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


    test('Restuarants can have multiple menus', async () => {
        const menu1 = await Menu.create({
            title: 'Breakfast'
        })
        const menu2 = await Menu.create({
            title: 'Lunch'
        })
        const restaurant1 = await Restaurant.create({
            name: 'LittleSheep',
            location: 'Dallas',
            cuisine: 'Hotpot'
        })
        await restaurant1.addMenu(menu1)
        await restaurant1.addMenu(menu2)
        let howMany = await restaurant1.getMenus()
        expect(howMany.length).toEqual(2)
    });

    test('can create an item', async () => {
        // TODO - write test
        const newItem = await Item.create({
            name: 'chicken',
            image: 'someimage.jpg',
            price: 9.50,
            vegetarian: true
        })

        expect(newItem.name).toEqual('chicken')
    });

    test('Menus can have multiple items', async () => {
        const item1 = await Item.create({
            name: 'bhindi masala',
            image: 'someimage.jpg',
            price: 9.50,
            vegetarian: true
        })
        const item2 = await Item.create({
            name: 'egusi soup',
            image: 'someimage.jpg',
            price: 10.50,
            vegetarian: false
        })
        const menu1 = await Menu.create({
            title: 'Dinner'
        })
        await menu1.addItem(item1)
        await menu1.addItem(item2)
        let howMany = await menu1.getItems()
        expect(howMany.length).toEqual(2)
    });

    test('Items can be added to multiple menus', async () => {
        const item1 = await Item.create({
            name: 'hamburger',
            image: 'someimage.jpg',
            price: 6.50,
            vegetarian: false
        })
        const menu1 = await Menu.create({
            title: 'Specials'
        })
        const menu2 = await Menu.create({
            title: 'Saver'
        })
        await menu1.addItem(item1)
        await menu2.addItem(item1)
        let howMany = await item1.getMenus()
        expect(howMany.length).toEqual(2)
    });

    test('Can return all items that are on a menu', async () => {


        const items = await Item.findAll({include: Menu})
        const itemsWithMenus = items.filter((y) => {
            if (y.dataValues.Menus.length > 0){
                return true
            }
        })

        const filtered = itemsWithMenus.map((y) => {
            y.dataValues.Menus
        })

        expect(filtered.length).toEqual(3)
    });
        
})