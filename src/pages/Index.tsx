import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [user, setUser] = useState({
    name: 'Алексей',
    bonusPoints: 340,
    level: 'Пивной мастер',
    nextLevelPoints: 500,
    isLoggedIn: false
  });

  const [cart, setCart] = useState([]);

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
    setCart([...cart, beer]);
  };

  const toggleLogin = () => {
    setUser(prev => ({ ...prev, isLoggedIn: !prev.isLoggedIn }));
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
              <Button variant="outline" size="sm" className="text-amber-900 border-amber-300 hover:bg-amber-100">
                <Icon name="ShoppingCart" size={16} className="mr-2" />
                Корзина ({cart.length})
              </Button>
              {!user.isLoggedIn ? (
                <Button onClick={toggleLogin} size="sm" className="bg-amber-600 hover:bg-amber-700">
                  Войти
                </Button>
              ) : (
                <div className="flex items-center space-x-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-amber-600 text-amber-50">{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{user.name}</span>
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
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarFallback className="bg-amber-600 text-amber-50 text-2xl">
                          {user.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="text-xl font-semibold text-amber-900">{user.name}</h4>
                        <p className="text-amber-700">{user.level}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h5 className="font-semibold text-amber-900 mb-2">Статистика покупок</h5>
                        <p className="text-sm text-amber-700">Всего заказов: 23</p>
                        <p className="text-sm text-amber-700">Литров выпито: 47.5л</p>
                      </div>
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h5 className="font-semibold text-amber-900 mb-2">Любимые сорта</h5>
                        <p className="text-sm text-amber-700">1. Warm Amber</p>
                        <p className="text-sm text-amber-700">2. Dark Stout</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="border-amber-200">
                <CardContent className="text-center py-12">
                  <Icon name="LogIn" size={48} className="mx-auto mb-4 text-amber-600" />
                  <h4 className="text-xl font-semibold text-amber-900 mb-2">Войдите в личный кабинет</h4>
                  <p className="text-amber-700 mb-6">Получите доступ к бонусам и истории заказов</p>
                  <Button onClick={toggleLogin} className="bg-amber-600 hover:bg-amber-700">
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