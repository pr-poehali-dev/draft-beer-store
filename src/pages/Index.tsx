import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    bonusPoints: 0,
    level: 'Новичок',
    nextLevelPoints: 500,
    isLoggedIn: false,
    orders: []
  });

  const [cart, setCart] = useState([]);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });

  const beerCatalog = [
    {
      id: 1,
      name: 'Warm Amber',
      type: 'Янтарный эль',
      price: 120,
      volume: '0.5л',
      alcohol: '5.2%',
      description: 'Насыщенный янтарный эль с карамельными нотками',
      available: true,
      image: '/img/dcb3008e-23d0-4707-b418-7af9a5155f73.jpg'
    },
    {
      id: 2,
      name: 'Craft Lager',
      type: 'Крафтовый лагер',
      price: 110,
      volume: '0.5л',
      alcohol: '4.8%',
      description: 'Освежающий лагер с хмелевой горчинкой',
      available: true,
      image: '/img/daddb266-7355-41fb-96bf-c0e1478f3fa7.jpg'
    },
    {
      id: 3,
      name: 'Dark Stout',
      type: 'Темный стаут',
      price: 140,
      volume: '0.5л',
      alcohol: '6.1%',
      description: 'Насыщенный темный стаут с шоколадными нотами',
      available: false,
      image: '/img/9c877e02-7245-4c65-81e1-0dd24179d550.jpg'
    }
  ];

  const addToCart = (beer) => {
    const existingItem = cart.find(item => item.id === beer.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === beer.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...beer, quantity: 1 }]);
    }
  };

  const removeFromCart = (beerId) => {
    setCart(cart.filter(item => item.id !== beerId));
  };

  const updateQuantity = (beerId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(beerId);
    } else {
      setCart(cart.map(item => 
        item.id === beerId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Простая проверка для демо
    if (loginForm.email && loginForm.password) {
      setUser({
        name: 'Алексей',
        email: loginForm.email,
        phone: '+7 (999) 123-45-67',
        bonusPoints: 340,
        level: 'Пивной мастер',
        nextLevelPoints: 500,
        isLoggedIn: true,
        orders: [
          { id: 1, date: '2024-01-15', items: ['Warm Amber', 'Craft Lager'], total: 230 },
          { id: 2, date: '2024-01-10', items: ['Dark Stout'], total: 140 }
        ]
      });
      setIsLoginOpen(false);
      setLoginForm({ email: '', password: '' });
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (registerForm.name && registerForm.email && registerForm.password === registerForm.confirmPassword) {
      setUser({
        name: registerForm.name,
        email: registerForm.email,
        phone: registerForm.phone,
        bonusPoints: 50, // Бонус за регистрацию
        level: 'Новичок',
        nextLevelPoints: 500,
        isLoggedIn: true,
        orders: []
      });
      setIsRegisterOpen(false);
      setRegisterForm({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
    }
  };

  const handleLogout = () => {
    setUser({
      name: '',
      email: '',
      phone: '',
      bonusPoints: 0,
      level: 'Новичок',
      nextLevelPoints: 500,
      isLoggedIn: false,
      orders: []
    });
  };

  const handleCheckout = () => {
    if (!user.isLoggedIn) {
      setIsLoginOpen(true);
      return;
    }
    
    // Добавляем заказ в историю
    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleDateString('ru-RU'),
      items: cart.map(item => `${item.name} x${item.quantity}`),
      total: getCartTotal()
    };
    
    setUser(prev => ({
      ...prev,
      orders: [...prev.orders, newOrder],
      bonusPoints: prev.bonusPoints + Math.floor(getCartTotal() / 10) // 1 балл за каждые 10 рублей
    }));
    
    setCart([]);
    setIsCartOpen(false);
    alert('Заказ оформлен! Спасибо за покупку!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-amber-900 text-amber-50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Beer" size={32} className="text-amber-300" />
              <h1 className="text-2xl font-bold text-amber-100">Разливнович</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#home" className="hover:text-amber-300 transition-colors">Главная</a>
              <a href="#catalog" className="hover:text-amber-300 transition-colors">Каталог</a>
              <a href="#profile" className="hover:text-amber-300 transition-colors">Личный кабинет</a>
              <a href="#bonuses" className="hover:text-amber-300 transition-colors">Бонусы</a>
              <a href="#contacts" className="hover:text-amber-300 transition-colors">Контакты</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="text-amber-900 border-amber-300 hover:bg-amber-100 relative">
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    Корзина
                    {getCartItemsCount() > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                        {getCartItemsCount()}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px]">
                  <SheetHeader>
                    <SheetTitle className="text-amber-900">Корзина</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {cart.length === 0 ? (
                      <div className="text-center py-8">
                        <Icon name="ShoppingCart" size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-500">Корзина пуста</p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                          {cart.map((item) => (
                            <div key={item.id} className="flex items-center space-x-4 p-4 border border-amber-200 rounded-lg">
                              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                              <div className="flex-1">
                                <h4 className="font-semibold text-amber-900">{item.name}</h4>
                                <p className="text-sm text-amber-700">{item.type}</p>
                                <p className="text-amber-900 font-bold">{item.price}₽</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Icon name="Minus" size={14} />
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Icon name="Plus" size={14} />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="destructive" 
                                  onClick={() => removeFromCart(item.id)}
                                  className="h-8 w-8 p-0 ml-2"
                                >
                                  <Icon name="X" size={14} />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Separator />
                        <div className="space-y-4">
                          <div className="flex justify-between text-lg font-bold text-amber-900">
                            <span>Итого:</span>
                            <span>{getCartTotal()}₽</span>
                          </div>
                          <Button 
                            onClick={handleCheckout} 
                            className="w-full bg-amber-600 hover:bg-amber-700"
                            size="lg"
                          >
                            {user.isLoggedIn ? 'Оформить заказ' : 'Войти и оформить'}
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
              
              {!user.isLoggedIn ? (
                <div className="flex space-x-2">
                  <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" className="border-amber-300 text-amber-900 hover:bg-amber-100">
                        Войти
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-amber-900">Вход в личный кабинет</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            value={loginForm.email}
                            onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Пароль</Label>
                          <Input 
                            id="password" 
                            type="password" 
                            value={loginForm.password}
                            onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                            required 
                          />
                        </div>
                        <div className="flex space-x-2">
                          <Button type="submit" className="flex-1 bg-amber-600 hover:bg-amber-700">
                            Войти
                          </Button>
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => {
                              setIsLoginOpen(false);
                              setIsRegisterOpen(true);
                            }}
                            className="flex-1"
                          >
                            Регистрация
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                  
                  <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                        Регистрация
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-amber-900">Регистрация</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="reg-name">Имя</Label>
                          <Input 
                            id="reg-name" 
                            value={registerForm.name}
                            onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reg-email">Email</Label>
                          <Input 
                            id="reg-email" 
                            type="email" 
                            value={registerForm.email}
                            onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reg-phone">Телефон</Label>
                          <Input 
                            id="reg-phone" 
                            type="tel" 
                            value={registerForm.phone}
                            onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})}
                            placeholder="+7 (999) 123-45-67"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reg-password">Пароль</Label>
                          <Input 
                            id="reg-password" 
                            type="password" 
                            value={registerForm.password}
                            onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reg-confirm">Подтвердите пароль</Label>
                          <Input 
                            id="reg-confirm" 
                            type="password" 
                            value={registerForm.confirmPassword}
                            onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                            required 
                          />
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => {
                              setIsRegisterOpen(false);
                              setIsLoginOpen(true);
                            }}
                            className="flex-1"
                          >
                            Есть аккаунт?
                          </Button>
                          <Button type="submit" className="flex-1 bg-amber-600 hover:bg-amber-700">
                            Зарегистрироваться
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-amber-600 text-amber-50">{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm hidden md:inline">{user.name}</span>
                  <Button 
                    onClick={handleLogout} 
                    size="sm" 
                    variant="outline" 
                    className="text-amber-900 border-amber-300 hover:bg-amber-100"
                  >
                    <Icon name="LogOut" size={14} />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20 bg-gradient-to-r from-amber-800 to-orange-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-amber-50">
              Разливнович
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-amber-100">
              Крафтовое пиво прямо из бочки. Собирайте бонусы и получайте бесплатные литры!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white">
                <Icon name="Beer" size={20} className="mr-2" />
                Смотреть каталог
              </Button>
              <Button size="lg" variant="outline" className="border-amber-300 text-amber-50 hover:bg-amber-100 hover:text-amber-900">
                <Icon name="Gift" size={20} className="mr-2" />
                Узнать о бонусах
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-amber-50 to-transparent"></div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <Tabs defaultValue="catalog" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="catalog">Каталог</TabsTrigger>
            <TabsTrigger value="profile">Личный кабинет</TabsTrigger>
            <TabsTrigger value="bonuses">Бонусы</TabsTrigger>
            <TabsTrigger value="contacts">Контакты</TabsTrigger>
          </TabsList>

          {/* Catalog */}
          <TabsContent value="catalog" id="catalog">
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-amber-900 mb-4">Наш каталог</h3>
              <p className="text-amber-700 mb-6">Свежее крафтовое пиво, сваренное с любовью</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {beerCatalog.map((beer) => (
                <Card key={beer.id} className="border-amber-200 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                  <div className="aspect-video bg-amber-50 flex items-center justify-center">
                    <img 
                      src={beer.image} 
                      alt={beer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-amber-900">{beer.name}</CardTitle>
                      <Badge variant={beer.available ? "default" : "secondary"} className="bg-amber-600">
                        {beer.available ? 'В наличии' : 'Закончилось'}
                      </Badge>
                    </div>
                    <p className="text-amber-700 text-sm">{beer.type}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">{beer.description}</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-amber-700">Объем: {beer.volume}</span>
                        <span className="text-amber-700">Крепость: {beer.alcohol}</span>
                      </div>
                      <div className="flex items-center justify-between pt-4">
                        <span className="text-2xl font-bold text-amber-900">{beer.price}₽</span>
                        <Button 
                          onClick={() => addToCart(beer)}
                          disabled={!beer.available}
                          className="bg-amber-600 hover:bg-amber-700"
                        >
                          <Icon name="Plus" size={16} className="mr-2" />
                          В корзину
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Profile */}
          <TabsContent value="profile" id="profile">
            {user.isLoggedIn ? (
              <div className="space-y-6">
                <Card className="border-amber-200">
                  <CardHeader>
                    <CardTitle className="flex items-center text-amber-900">
                      <Icon name="User" size={24} className="mr-2" />
                      Профиль пользователя
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarFallback className="bg-amber-600 text-amber-50 text-2xl">
                          {user.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-amber-900">{user.name}</h4>
                        <p className="text-amber-700">{user.level}</p>
                        <p className="text-sm text-amber-600">{user.email}</p>
                        {user.phone && <p className="text-sm text-amber-600">{user.phone}</p>}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h5 className="font-semibold text-amber-900 mb-2">Статистика покупок</h5>
                        <p className="text-sm text-amber-700">Всего заказов: {user.orders.length}</p>
                        <p className="text-sm text-amber-700">Потрачено: {user.orders.reduce((sum, order) => sum + order.total, 0)}₽</p>
                      </div>
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h5 className="font-semibold text-amber-900 mb-2">Бонусы</h5>
                        <p className="text-sm text-amber-700">Текущие баллы: {user.bonusPoints}</p>
                        <p className="text-sm text-amber-700">Уровень: {user.level}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* История заказов */}
                <Card className="border-amber-200">
                  <CardHeader>
                    <CardTitle className="flex items-center text-amber-900">
                      <Icon name="Clock" size={24} className="mr-2" />
                      История заказов
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {user.orders.length === 0 ? (
                      <div className="text-center py-8">
                        <Icon name="ShoppingBag" size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-500">У вас пока нет заказов</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {user.orders.slice().reverse().map((order) => (
                          <div key={order.id} className="border border-amber-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-amber-900">Заказ #{order.id}</span>
                              <span className="text-sm text-amber-700">{order.date}</span>
                            </div>
                            <div className="text-sm text-amber-700 mb-2">
                              {order.items.join(', ')}
                            </div>
                            <div className="flex items-center justify-between">
                              <Badge className="bg-green-100 text-green-800 border-green-300">
                                Выполнен
                              </Badge>
                              <span className="font-bold text-amber-900">{order.total}₽</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="border-amber-200">
                <CardContent className="text-center py-12">
                  <Icon name="LogIn" size={48} className="mx-auto mb-4 text-amber-600" />
                  <h4 className="text-xl font-semibold text-amber-900 mb-2">Войдите в личный кабинет</h4>
                  <p className="text-amber-700 mb-6">Получите доступ к бонусам и истории заказов</p>
                  <Button onClick={() => setIsLoginOpen(true)} className="bg-amber-600 hover:bg-amber-700">
                    Войти
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Bonuses */}
          <TabsContent value="bonuses" id="bonuses">
            <div className="space-y-6">
              <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-amber-900">
                    <Icon name="Gift" size={24} className="mr-2" />
                    Система бонусов
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {user.isLoggedIn ? (
                    <>
                      <div className="text-center">
                        <h4 className="text-2xl font-bold text-amber-900 mb-2">
                          {user.bonusPoints} бонусных очков
                        </h4>
                        <p className="text-amber-700">
                          До бесплатного литра: {user.nextLevelPoints - user.bonusPoints} очков
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-amber-700">Прогресс до награды</span>
                          <span className="text-amber-900 font-semibold">
                            {user.bonusPoints}/{user.nextLevelPoints}
                          </span>
                        </div>
                        <Progress 
                          value={(user.bonusPoints / user.nextLevelPoints) * 100} 
                          className="h-3"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      <h4 className="text-xl font-semibold text-amber-900 mb-4">
                        Войдите, чтобы видеть бонусы
                      </h4>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-amber-200">
                      <h5 className="font-semibold text-amber-900 mb-2">
                        <Icon name="Star" size={20} className="inline mr-2" />
                        Как получить бонусы
                      </h5>
                      <ul className="text-sm text-amber-700 space-y-1">
                        <li>• За каждые 100₽ = 10 очков</li>
                        <li>• Регистрация = 50 очков</li>
                        <li>• День рождения = 100 очков</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-amber-200">
                      <h5 className="font-semibold text-amber-900 mb-2">
                        <Icon name="Trophy" size={20} className="inline mr-2" />
                        Награды
                      </h5>
                      <ul className="text-sm text-amber-700 space-y-1">
                        <li>• 500 очков = Бесплатный литр</li>
                        <li>• 1000 очков = Эксклюзивное пиво</li>
                        <li>• 2000 очков = Скидка 20%</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Contacts */}
          <TabsContent value="contacts" id="contacts">
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center text-amber-900">
                  <Icon name="MapPin" size={24} className="mr-2" />
                  Контакты
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Icon name="MapPin" size={20} className="text-amber-600 mt-1" />
                      <div>
                        <h5 className="font-semibold text-amber-900">Адрес</h5>
                        <p className="text-amber-700">ул. Пивная, 42<br />Москва, 123456</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Icon name="Phone" size={20} className="text-amber-600 mt-1" />
                      <div>
                        <h5 className="font-semibold text-amber-900">Телефон</h5>
                        <p className="text-amber-700">+7 (495) 123-45-67</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Icon name="Clock" size={20} className="text-amber-600 mt-1" />
                      <div>
                        <h5 className="font-semibold text-amber-900">Режим работы</h5>
                        <p className="text-amber-700">Пн-Чт: 12:00-23:00<br />Пт-Сб: 12:00-01:00<br />Вс: 14:00-22:00</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-amber-50 p-6 rounded-lg">
                    <h5 className="font-semibold text-amber-900 mb-4">Найдите нас</h5>
                    <div className="bg-amber-200 rounded-lg h-48 flex items-center justify-center">
                      <Icon name="Map" size={48} className="text-amber-600" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-50 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Icon name="Beer" size={24} className="text-amber-300" />
              <h3 className="text-xl font-bold">Разливнович</h3>
            </div>
            <p className="text-amber-200 mb-4">Лучшее крафтовое пиво в городе</p>
            <div className="flex justify-center space-x-6">
              <Icon name="Instagram" size={20} className="text-amber-300 hover:text-amber-100 cursor-pointer" />
              <Icon name="Facebook" size={20} className="text-amber-300 hover:text-amber-100 cursor-pointer" />
              <Icon name="Twitter" size={20} className="text-amber-300 hover:text-amber-100 cursor-pointer" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;