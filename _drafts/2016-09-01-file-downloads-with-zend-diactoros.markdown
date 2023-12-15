---
layout:     post
title:      "File downloads with Zend Diactoros"
subtitle:   "PSR-7 compatible Response class for file downloads"
date:       2016-09-01 10:26:00
published:  2016-09-01 10:26:00
author:     "Marco Bunge"
header-img: "img/code.jpg"
series:     "application development"
tags:
 - howto
 - php
 - http
---

In my daily work I often need the possibility of file downloads. I basically use <a href="https://www.php-fig.org/psr/psr-7/" target="blank">PSR-7 standard</a> and <a href="https://zendframework.github.io/zend-diactoros/" target="blank">Zend Diactoros</a> for HTTP communication.
Zend Diactoros does not have a built in support for file downloads. Therefore I wrote a response which is supporting file 
downloads. Here it is:

```php
<?php

use Psr\Http\Message\StreamInterface;
use Zend\Diactoros\Response;
use Zend\Diactoros\Response\InjectContentTypeTrait;
use Zend\Diactoros\Stream;

class AttachmentResponse extends Response
{
    use InjectContentTypeTrait;

    /**
     * Create a file attachment response.
     *
     * Produces a text response with a Content-Type of given file mime type and a default
     * status of 200.
     *
     * @param string $file Valid file path
     * @param int $status Integer status code for the response; 200 by default.
     * @param array $headers Array of headers to use at initialization.
     * @internal param StreamInterface|string $text String or stream for the message body.
     */
    public function __construct($file, $status = 200, array $headers = [])
    {
        $fileInfo = new \SplFileInfo($file);

        $headers = array_replace($headers, [
            'content-length' => $fileInfo->getSize(),
            'content-disposition' => sprintf('attachment; filename=%s', $fileInfo->getFilename()),
        ]);

        parent::__construct(
            new Stream($fileInfo->getRealPath(), 'r'),
            $status,
            $this->injectContentType((new \finfo(FILEINFO_MIME_TYPE))->file($fileInfo->getRealPath()), $headers)
        );
    }
}

```
