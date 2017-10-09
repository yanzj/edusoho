<?php

namespace ApiBundle\Api\Resource\Trade\Factory;

use Biz\User\Service\UserService;

class WechatPayJsTrade extends BaseTrade
{
    protected $payment = 'wechat';

    protected $platformType = 'Js';

    public function getCustomFields($params)
    {
        return array(
            'open_id' => $params['openId'],
        );
    }

    public function createResponse($trade)
    {
        return array(
            'tradeSn' => $trade['trade_sn'],
            'jsApiParams' => json_encode($trade['platform_created_result']),
            'successUrl' => $this->generateUrl('cashier_pay_return', array('payment' => $this->payment, 'tradeSn' => $trade['trade_sn']), true),
        );

    }

    /**
     * @return UserService
     */
    private function getUserService()
    {
        return $this->biz->service('User:UserService');
    }
}