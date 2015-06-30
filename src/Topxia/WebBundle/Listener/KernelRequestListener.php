<?php
namespace Topxia\WebBundle\Listener;
 
use Symfony\Component\HttpKernel\Event\GetResponseEvent;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Topxia\Service\Common\ServiceKernel;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class KernelRequestListener

{
    public function __construct($container)
    {
        $this->container = $container;
    }

    public function onKernelRequest(GetResponseEvent $event)
    {
    	$request = $event->getRequest();
        $currentUser = $this->getUserService()->getCurrentUser();
        $setting = $this->getSettingService()->get('login_bind');
        $user_agent = $request->server->get('HTTP_USER_AGENT');
        $_target_path = $request->getPathInfo();

        if (($event->getRequestType() == HttpKernelInterface::MASTER_REQUEST) && ($request->getMethod() == 'POST')) {

            if (stripos($request->getPathInfo(), '/mapi') === 0) {
                return;
            }
            $whiteList = array('/coin/pay/return/alipay','/coin/pay/notify/alipay','/pay/center/pay/alipay/return', '/pay/center/pay/alipay/notify','/live/verify','/course/order/pay/alipay/notify', '/vip/pay_notify/alipay', '/uploadfile/upload', '/uploadfile/cloud_convertcallback', '/uploadfile/cloud_convertcallback2', '/uploadfile/cloud_convertcallback3', '/uploadfile/cloud_convertheadleadercallback', '/disk/upload', '/file/upload', '/editor/upload', '/disk/convert/callback', '/partner/phpwind/api/notify', '/partner/discuz/api/notify', '/live/auth', '/edu_cloud/sms_callback');
            if (in_array($request->getPathInfo(), $whiteList)) {
                return ;
            }

    		if ($request->isXmlHttpRequest()) {
    			$token = $request->headers->get('X-CSRF-Token');
    		} else {
	    		$token = $request->request->get('_csrf_token', '');
            }
    		$request->request->remove('_csrf_token');

    		$expectedToken = $this->container->get('form.csrf_provider')->generateCsrfToken('site');
    		if ($token != $expectedToken) {
                // @todo 需要区分ajax的response
                if ($request->getPathInfo() == '/admin') {
                    $token = $request->request->get('token');
                    $result = ServiceKernel::instance()->createService('CloudPlatform.AppService')->repairProblem($token);

                    $this->container->set('Topxia.RepairProblem', $result);
                } else {
        			$response = $this->container->get('templating')->renderResponse('TopxiaWebBundle:Default:message.html.twig', array(
        				'type' => 'error',
        				'message' => '页面已过期，请重新提交数据！',
        				'goto' => '',
        				'duration' => 0,
    				));

        			$event->setResponse($response);
                }

    		}
    	}
        
        if (!$currentUser->islogin()) {
            return;
        }
        if (strpos($user_agent,'MicroMessenger') && !$currentUser->isLogin() && $setting['enabled'] && $setting['weixinmob_enabled']) {
            $route = 'login_bind';
            $whiteList = array('/login/bind/weixinmob','/login/bind/weixinmob/callback','/login/bind/weixinmob/new','/login/bind/weixinmob/newset','/login/bind/weixinmob/existbind','/register','/partner/login');
            if (in_array($request->getPathInfo(), $whiteList)) {
                return ;
            }
            $url = $this->container->get('router')->generate($route,array('type' => 'weixinmob'));
            $response = new RedirectResponse($url);
            $event->setResponse($response);
            return ;
        } 

    }

    protected function getServiceKernel()
    {
        return ServiceKernel::instance();
    }

    protected function getSettingService()
    {
        return $this->getServiceKernel()->createService('System.SettingService');
    }

    public function redirect($url, $status = 302)
    {
        return new RedirectResponse($url, $status);
    }

    protected function getUserService()
    {
        return ServiceKernel::instance()->createService('User.UserService');
    }
}