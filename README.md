# jenkins-docker-slaves

This project aims to provide boilerplate and simple example in order to build up jenkins master-slaves cluster. 

## Jenkins over Docker example

This project contains various files such as Dockerfile or related files, 
which forms a practical Jenkins master-slave configuration over Docker.

## Support slave types

There are a few mechanisms to support slave.

- ssh-slave

  jenkins server connects to slave via ssh. jenkins server should know the ip address of slave and have ssh public key of slave.
  
- jnlp-slave

  jnlp agent.jar connects to server. jnlp slave should know the URL of jenkins server jnlp and secret.
  This implementation does not require secret.


## Background

This project forked from "https://github.com/knjname/jenkins-docker-example".

The blog entry is http://knjname.hateblo.jp/entry/2014/05/03/190842 (In Japanese).

I had to struggle to work it well. Because this omits permission settings to have
master connect to slave via ssh. I wrote down every permission setting in this project.
I hope this would help someone.



## To build Jenkins master node

```
#> cd master
#> make
(An image ci/master will be registered.)
```

### And to run

Modify dockerrun.sh to setup directories.

```
#> cd master
#> bash dockerrun.sh
```

Access to http://`address`:8880/ to execute jenkins.


### setup plugin

  ssh slave plugin is required.
  Add the plugin through administration GUI menu 



## To build Jenkins slave node (ssh)

```
#> cd ssh-slave
#> make
(An image ci/ssh-slave will be registered.)
```

### ssh settings

In order to work cluster well, ssh settings is important. ssh setting is difficult to understand and setup correctly.
These Dockerfiles contains several commands to setup ssh and sshd.

The key passphrase stored in ssh-files is "jenkins" in double quotes.
 
### Setup credential

  To setup credential, register authentication information on jenkins.
  Use root's .ssh directory.
  If not work, specify direct ssh private key on jenkins.
  
### Add slave using ssh agent

  Add slave node with using ssh-credential from GUI menu as ssh slave node.
  
  
### And to run

```
#> cd ssh-slave
#> bash dockerrun.sh
```

On ssh-slave node, sshd listens to your_host:11022 .  (11022->22)  port is specified in dockerurn.sh. so you can modify it easily.

To connect between the master and the slave, you have to configure it manually 
via Jenkins administration menu.

- via ssh and specify port(11022) to connect to slave.


## To build Jenkins slave node (jnlp)


```
#> cd jnlp-slave
#> make
(An image ci/jnlp-slave will be registered.)
```

### Add jnlp slave

 Add slave node from GUI menu as jnlp slave node.

 You can get URL to invoke agent of slave side after defining node on administration menu. 
 Same as the URL, set URL variable in dockerrun.sh. 


### And to run

```
#> cd ssh-slave
#> bash dockerrun-01.sh
#> bash dockerrun-02.sh
#> bash dockerrun.sh node3 http://localhost:8880/computer/node3/slave-agent.jnlp 12122
```




## Directories

  Docker image contains directories to mount external directory to save data permanently. 
  See dockerrun.sh (both master and slave) to specify external directory.

### Master directories

```
/root/.ssh ssh key (intrinsic)
/var/log/jenkins log directory
/var/lib/jenkins workspace directory
/usr/lib/jenkins (intrinsic)
```
jenkins works with root permission as root. 


### Slave directories

```
/home/jenkins is home directory to keep .ssh directory. (intrinsic)
/var/lib/jenkins is mount point of workspace.
```

So at the beginning of job script, you had better changing directory to /var/lib/jenkins/workspace directly.
Don't use $HOME/workspace.














