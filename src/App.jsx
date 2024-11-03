import { createSignal, For, Show } from 'solid-js';
import { createStore } from 'solid-js/store';

function App() {
  const [cart, setCart] = createStore([]);
  const [selectedProduct, setSelectedProduct] = createSignal(null);
  const [showCart, setShowCart] = createSignal(false);
  const [loading, setLoading] = createSignal(false);

  const products = [
    {
      id: 1,
      name: 'قميص رجالي كلاسيكي',
      description: 'قميص رجالي أنيق مصنوع من القطن عالي الجودة.',
      price: 150,
      image: 'https://example.com/images/shirt1.jpg',
    },
    {
      id: 2,
      name: 'حذاء رجالي رسمي',
      description: 'حذاء جلدي فاخر مناسب للمناسبات الرسمية.',
      price: 250,
      image: 'https://example.com/images/shoe1.jpg',
    },
    {
      id: 3,
      name: 'بدلة رسمية',
      description: 'بدلة رجالية فاخرة من الصوف الإيطالي.',
      price: 1200,
      image: 'https://example.com/images/suit1.jpg',
    },
    {
      id: 4,
      name: 'ساعة يد كلاسيكية',
      description: 'ساعة يد أنيقة بتصميم كلاسيكي.',
      price: 800,
      image: 'https://example.com/images/watch1.jpg',
    },
    // يمكن إضافة المزيد من المنتجات حسب الحاجة
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const totalPrice = () => cart.reduce((total, item) => total + item.price, 0);

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  return (
    <div class="min-h-screen bg-gray-100 text-gray-900" dir="rtl" lang="ar">
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 class="text-3xl font-bold text-gray-900">متجر محمد الصالحي</h1>
          <div class="flex space-x-4">
            <button
              class="relative bg-gray-800 text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
              onClick={() => setShowCart(!showCart())}
            >
              السلة
              <span class="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                {cart.length}
              </span>
            </button>
          </div>
        </div>
      </header>

      <main class="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 h-full">
        <Show when={!selectedProduct() && !showCart()}>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <For each={products}>
              {(product) => (
                <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <img src={product.image} alt={product.name} class="w-full h-48 object-cover" />
                  <div class="p-4">
                    <h3 class="text-lg font-semibold mb-2">{product.name}</h3>
                    <p class="text-gray-700 mb-2">{product.description}</p>
                    <p class="text-purple-600 font-bold mb-4">{product.price} ريال</p>
                    <button
                      class="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-md cursor-pointer"
                      onClick={() => setSelectedProduct(product)}
                    >
                      عرض التفاصيل
                    </button>
                  </div>
                </div>
              )}
            </For>
          </div>
        </Show>

        <Show when={selectedProduct()}>
          <div class="bg-white rounded-lg shadow-md p-6">
            <button
              class="mb-4 text-blue-500 hover:underline cursor-pointer"
              onClick={() => setSelectedProduct(null)}
            >
              العودة إلى القائمة
            </button>
            <div class="flex flex-col md:flex-row">
              <img
                src={selectedProduct().image}
                alt={selectedProduct().name}
                class="w-full md:w-1/2 h-auto object-cover rounded-lg"
              />
              <div class="md:mr-6 mt-6 md:mt-0">
                <h2 class="text-2xl font-bold mb-4">{selectedProduct().name}</h2>
                <p class="text-gray-700 mb-4">{selectedProduct().description}</p>
                <p class="text-purple-600 font-bold text-xl mb-6">{selectedProduct().price} ريال</p>
                <button
                  class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md cursor-pointer"
                  onClick={() => {
                    addToCart(selectedProduct());
                    setSelectedProduct(null);
                  }}
                >
                  إضافة إلى السلة
                </button>
              </div>
            </div>
          </div>
        </Show>

        <Show when={showCart()}>
          <div class="bg-white rounded-lg shadow-md p-6">
            <button
              class="mb-4 text-blue-500 hover:underline cursor-pointer"
              onClick={() => setShowCart(false)}
            >
              العودة إلى التسوق
            </button>
            <h2 class="text-2xl font-bold mb-4">سلة المشتريات</h2>
            <Show when={cart.length > 0} fallback={<p>السلة فارغة</p>}>
              <For each={cart}>
                {(item, index) => (
                  <div class="flex justify-between items-center mb-4">
                    <p>{item.name}</p>
                    <div class="flex items-center">
                      <p class="mr-4">{item.price} ريال</p>
                      <button
                        class="text-red-500 hover:text-red-700 cursor-pointer"
                        onClick={() => removeFromCart(index())}
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                )}
              </For>
              <div class="flex justify-between items-center border-t pt-4">
                <p class="font-bold">المجموع:</p>
                <p class="font-bold">{totalPrice()} ريال</p>
              </div>
              <button
                class="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md cursor-pointer"
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    alert('تم إتمام عملية الشراء بنجاح!');
                    setCart([]);
                    setShowCart(false);
                    setLoading(false);
                  }, 1000);
                }}
                disabled={loading()}
                classList={{ 'opacity-50 cursor-not-allowed': loading() }}
              >
                <Show when={!loading()} fallback={<span>جاري المعالجة...</span>}>
                  إتمام الشراء
                </Show>
              </button>
            </Show>
          </div>
        </Show>
      </main>
    </div>
  );
}

export default App;