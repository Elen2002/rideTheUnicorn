<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserType;
use App\Interfaces\UserInterface;
use App\Interfaces\UploadFileInterface;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/user')]
class UserController extends AbstractController
{
    #[Route('/', name: 'app_user_all', methods: ['POST'])]
    public function index(Request $request, UserInterface $userService): Response
    {
        $params = $request->request->all();
        $response = $userService->getUsernames($params);
        return new JsonResponse($response);
    }

    #[Route('/new', name: 'app_user_new', methods: ['POST'])]
    public function new(Request $request, UserInterface $userService): Response
    {
        $params = array_merge($request->request->all(), $request->query->all());
        $result = $userService->register($params);
        return new JsonResponse($result);
    }

    #[Route('/set/userData', name: 'app_user_coins', methods: ['POST', 'GET'])]
    public function changeCoins(Request $request, UserInterface $userService): Response
    {
        $params = array_merge($request->request->all(), $request->query->all());
        $result = $userService->addCoins($params);
        return new JsonResponse($result);
    }

    #[Route('/one', name: 'app_user_show', methods: ['POST', 'GET'])]
    public function show(Request $request, UserInterface $userService): Response
    {
        $params = array_merge($request->request->all(), $request->query->all());
        if(isset($params['id']) && $params['id']){
            $result = $userService->getOne($params['id']);
        }else{
            $result= 'id is missing';
        }
        return new JsonResponse($result);
    }

    #[Route('/all', name: 'app_user_all', methods: ['POST', 'GET'])]
    public function edit(Request $request, UserInterface $userService, EntityManagerInterface $entityManager): Response
    {
        $result = $userService->getAll();
        return new JsonResponse($result);
    }

}